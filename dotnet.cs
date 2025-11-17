using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Globalization;

/// <summary>
/// Ниже пример, как в .NET преобразовать произвольную русскую строку в человекопонятный URL-slug 
/// (транслитерация + приведение к нижнему регистру + замена пробелов на дефисы + удаление лишних символов).
/// пришло - модуль Schneider Electric TM241CE40T БАЗОВЫЙ БЛОК M241-40IO ТРАНЗИСТ ИСТОЧНИК ETHERNET
/// результат - schneider-electric-tm241ce40t-bazovyy-blok-m241-40io-tranzist-istochnik-ethernet
/// </summary>
class Program
{
    static void Main()
    {
        string text = "модуль Schneider Electric TM241CE40T БАЗОВЫЙ БЛОК M241-40IO ТРАНЗИСТ ИСТОЧНИК ETHERNET";

        string slug = CreateSlug(text);
        Console.WriteLine(slug);
    }

    static string CreateSlug(string phrase)
    {
        // 1. Транслитерация кириллицы → латиница
        phrase = Transliterate(phrase);

        // 2. В нижний регистр
        phrase = phrase.ToLowerInvariant();

        // 3. Заменить всё, что не буква/цифра, на дефисы
        phrase = Regex.Replace(phrase, @"[^a-z0-9]+", "-");

        // 4. Удалить повторяющиеся дефисы
        phrase = Regex.Replace(phrase, @"-+", "-");

        // 5. Удалить дефисы по краям
        phrase = phrase.Trim('-');

        return phrase;
    }

    static string Transliterate(string text)
    {
        var map = new (string cyr, string lat)[]
        {
            ("а","a"), ("б","b"), ("в","v"), ("г","g"), ("д","d"),
            ("е","e"), ("ё","e"), ("ж","zh"), ("з","z"), ("и","i"),
            ("й","y"), ("к","k"), ("л","l"), ("м","m"), ("н","n"),
            ("о","o"), ("п","p"), ("р","r"), ("с","s"), ("т","t"),
            ("у","u"), ("ф","f"), ("х","h"), ("ц","c"), ("ч","ch"),
            ("ш","sh"), ("щ","shch"), ("ъ",""), ("ы","y"), ("ь",""),
            ("э","e"), ("ю","yu"), ("я","ya")
        };

        var sb = new StringBuilder(text.Length);

        foreach (var ch in text)
        {
            string s = ch.ToString();
            string lower = s.ToLower();

            bool replaced = false;
            foreach (var (cyr, lat) in map)
            {
                if (lower == cyr)
                {
                    // Сохраняем регистр
                    sb.Append(char.IsUpper(ch) ? 
                              char.ToUpper(lat[0]) + lat[1..] : lat);
                    replaced = true;
                    break;
                }
            }

            if (!replaced)
                sb.Append(s); // не кириллица → оставить как есть
        }

        return sb.ToString();
    }
}
