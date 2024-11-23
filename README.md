# translation mapper

because im noob in foregin language, i decided to make this slop to translate lyrics into translatable and understandable segments. diviser, régner

## how to obtain translation

because, any translator sucks at being translate into a mappable format, i decide to ask chatgpt for this sloppy prompt:

```
Task: Convert the provided lyrics into the following JSON format. Each line of the lyrics should be represented as an object in the lines array. Each object contains the following keys:
reference: An array of words or phrases in the original language (split logically by meaning or grammatical role).
Each word in the reference array can have a ruby added to it using the : character to provide a reading for non-native words (e.g., Kanji with readings like 漢字:かんじ).
translation: An array of corresponding English words or phrases (aligned by meaning or grammatical role to the reference). The translation must be clear and appropriate for the context.
Similar to the reference array, the translation can include ruby if necessary for difficult terms (e.g., kanji:kanji).
mapper: An array where each index corresponds to the position in the reference array, and its value is the index of the corresponding word in the translation array. Use null if no corresponding translation exists for a word in the reference.
note: Optional. A commentary section for the translator. This field should be included only if the translation requires additional context or explanation. The note should clarify meaning, particularly when the translation does not capture the nuance or specific cultural reference. This field can be left as null if no explanation is needed.
Example:
Input: `どうしてすぐ知ってしまうの`
Output:
json
{
  "lines": [
    {
      "reference": [
        "どうして",
        "すぐ",
        "知って",
        "しまう",
        "の"
      ],
      "translation": [
        "Why",
        "do",
        "I",
        "quickly",
        "know"
      ],
      "mapper": [
        0,
        null,
        null,
        1,
        2
      ],
      "note": null
    }
  ]
}
Details:
reference: Each Japanese word or phrase is listed individually, with the option to add ruby readings using : (e.g., 漢字:かんじ).
translation: English equivalents that are contextually accurate. If needed, ruby readings can be added for complex terms.
mapper: An index mapping that shows the position of each word in the reference array compared to the translation.
note: Only added if the translation is hard to explain, typically to give extra context for difficult-to-translate expressions or slang. If unnecessary, this field should be omitted or set to null.
```

problem: it constantly hallucinate on word segmentation. best result on claude.
