import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Card from 'react-bootstrap/Card';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import { styled } from '@mui/system';
import genreEngToKor from '../genreEngToKor';



const HomeCard = (props) => {
    const webtoon = props.webtoon;
    const platform = props.platform;

    // console.log(platform)
    
    // console.log(props)
    
    const StyledTableCell = styled(TableCell)({
        padding: 8,
        borderBottom: 0,
    })


    return (
        <StyledTableCell>
            <Card className='home-card'>
                <Link to={`/webtoon/details/${webtoon._id}`}>
                    <Card.Img className='home-card-img' variant="top" src={webtoon.thumbnail} />
                
                <Card.ImgOverlay>
                    {webtoon.adult === true && <img className="home-ico-adult" src={require('../../logo/adult.png')} alt="hi" />}
                    {/* <Typography variant='' className='home-card-title'>{webtoon.title}</Typography> */}
                    <Card.Body className='home-card-title'>
                        {webtoon.title}
                    </Card.Body>
                    <Card.Body className='home-card-info'>
                        {genreEngToKor(platform.genre.name)}
                        {/* <a className='home-card-link' href={`/webtoon/details/${webtoon._id}`} style={{color:'white'}}>{platform.genre.name}</a> */}
                    </Card.Body>
                </Card.ImgOverlay>
                </Link>
            </Card>
        </StyledTableCell>
    );
};



// <Card>
// {platform.webtoon.title}
// <Card.Img src={platform.webtoon.thumbnail} alt="img">
// </Card.Img>
// </Card>

export default HomeCard;

