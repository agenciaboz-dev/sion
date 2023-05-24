import React, { useState, useEffect } from "react"
import "./style.scss"
import { useApi } from "../../../hooks/useApi"
import { Texts as TextsType } from "../../../definitions/texts"
import { User } from "../../../definitions/user"
import { useIndexedList } from "../../../hooks/useIndexedList"
import { TextContainer } from "./TextContainer"

interface TextsProps {
    user: User
}

interface TextContainer {
    text: TextsType
}

interface FormValues extends Array<TextsType> {}

export const Texts: React.FC<TextsProps> = ({ user }) => {
    const api = useApi()
    const { newArray } = useIndexedList()
    const sections = newArray(7)

    const [texts, setTexts] = useState<TextsType[]>([])

    useEffect(() => {
        api.texts.get({
            callback: (response: { data: TextsType[] }) => {
                setTexts(response.data)
            },
        })
    }, [])

    return (
        <div className="Texts-Component">
            {sections.map((section) => (
                <div key={section} className="section-container">
                    <p>Seção {section}</p>
                    <div className="texts-container">
                        {texts
                            .filter((text) => text.section == section)
                            .map((text) => (
                                <TextContainer key={text.id} text={text} />
                            ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
