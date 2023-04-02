import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Card from 'react-bootstrap/Card';
import {TableCell} from '@mui/material';
import { styled } from '@mui/system';
import genreEngToKor from '../genreEngToKor';
import originalImageToWebImage from '../originalImageToWebImage';

const HomeCard = (props) => {
    const webtoon = props.webtoon;
    const platform = props.platform;
    const StyledTableCell = styled(TableCell)({
        padding: 8,
        borderBottom: 0,
    })

    
    return (
        <StyledTableCell>
            <Card className='home-card'>
                <Link to={`/webtoon/details/${webtoon._id}`}>
                    <Card.Img className='home-card-img' variant="top" src={originalImageToWebImage(webtoon, 80, 80)} />
                <Card.ImgOverlay>
                    {webtoon.adult === true && <img className="home-ico-adult" src={require('../../logo/adult.png')} alt="hi" />}
                    <Card.Body className='home-card-title'>
                        {webtoon.title}
                    </Card.Body>
                    <Card.Body className='home-card-info'>
                        {genreEngToKor(platform.genre.name)}
                    </Card.Body>
                </Card.ImgOverlay>
                </Link>
            </Card>
        </StyledTableCell>
    );
};
export default HomeCard;

