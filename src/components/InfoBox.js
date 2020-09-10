import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

function InfoBox({title,cases,total}) {
    return (
        <Card className='infobox'>
            <CardContent>
                <Typography className="infobox__title"  color='textSecondary'>
                    {title}
                </Typography>

                <h2 className="infobox__cases"  >{cases}</h2>

                <Typography className="infobox__total"   color='textSecondary'>
                    {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
