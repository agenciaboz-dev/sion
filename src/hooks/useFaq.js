import { useTexts } from "./useTexts"

export const useFaq = () => {
    const texts = useTexts().faq.slice(2)
    const questions = [
        {
            number: 1,
            text: texts[0]?.text,
            answer: texts[1]?.text,
        },
        {
            number: 2,
            text: texts[2]?.text,
            answer: texts[3]?.text,
        },
        {
            number: 3,
            text: texts[4]?.text,
            answer: texts[5]?.text,
        },
        {
            number: 4,
            text: texts[6]?.text,
            answer: texts[7]?.text,
        },
        {
            number: 5,
            text: texts[8]?.text,
            answer: texts[9]?.text,
        },
        {
            number: 6,
            text: texts[10]?.text,
            answer: texts[11]?.text,
        },
        {
            number: 7,
            text: texts[12]?.text,
            answer: texts[13]?.text,
        },
        {
            number: 8,
            text: texts[14]?.text,
            answer: texts[15]?.text,
        },
        {
            number: 9,
            text: texts[16]?.text,
            answer: texts[17]?.text,
        },
        {
            number: 10,
            text: texts[18]?.text,
            answer: texts[19]?.text,
        },
    ]

    return questions
}
