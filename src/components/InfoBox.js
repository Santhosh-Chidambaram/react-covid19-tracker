import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import '../App.css'
import { prettyFormat } from '../utils/utils'
function InfoBox({title,cases,total,type,active,...props}){
    return (
        <Card className={`infobox ${active && "infobox--"+type}`} onClick={props.onClick}>
            <CardContent>
                <Typography className="infobox__title"  color='textSecondary'>
                    {title}
                </Typography>

                <h2 className="infobox__cases"  >{prettyFormat(cases)}</h2>

                <Typography className="infobox__total"   color='textSecondary'>
                    {prettyFormat(total)} Total
                </Typography>
            </CardContent>
        </Card>
    )

} 
  


export default InfoBox
