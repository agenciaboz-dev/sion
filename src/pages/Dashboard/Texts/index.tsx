import React, { useState, useEffect } from "react"
import "./style.scss"
import { useApi } from "../../../hooks/useApi"
import { Texts as TextsType } from "../../../definitions/texts"
import { User } from "../../../definitions/user"
import { useIndexedList } from "../../../hooks/useIndexedList"
import { TextContainer } from "./TextContainer"
import { Skeleton, SxProps } from "@mui/material"

interface TextsProps {
    user: User
}

export const Texts: React.FC<TextsProps> = ({ user }) => {
    const api = useApi()
    const { newArray } = useIndexedList()
    const sections = newArray(7)
    const skeletons = newArray(7)

    const [texts, setTexts] = useState<TextsType[]>([])

    const skeleton_style: SxProps = {
        width: "100%",
        height: "25vw",
        flexShrink: 0,
    }

    useEffect(() => {
        api.texts.get({
            callback: (response: { data: TextsType[] }) => {
                setTexts(response.data)
            },
        })
    }, [])

    return (
        <div className="Texts-Component">
            {texts.length > 0
                ? sections.map((section) => (
                      <div key={section} className="section-container">
                          <p>Seção {section}</p>
                          <div className="texts-container">
                              {texts
                                  .filter((text) => text.section == section)
                                  .map((text) => (
                                      <TextContainer key={text.id} text={text} user={user} />
                                  ))}
                          </div>
                      </div>
                  ))
                : skeletons.map((index) => <Skeleton key={index} variant="rectangular" sx={skeleton_style} />)}
        </div>
    )
}
