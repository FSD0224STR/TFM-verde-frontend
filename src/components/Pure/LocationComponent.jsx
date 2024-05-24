import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TextField } from '@mui/material';

const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
})(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
        }),
}));

export  function LocationsComponent({name,
        address,events
}) {
        const [expanded, setExpanded] = React.useState(false);
        
        const [eventValues, setEventValues] = React.useState(
                events.reduce((acc, event) => {
                        acc[event._id] = event.typeOfDancing || ''; 
                        return acc;
                }, {})
        );

        const handleChange = (eventId, value) => {
                setEventValues((prevValues) => ({
                        ...prevValues,
                        [eventId]: value,
                }));
        };

        const handleExpandClick = () => {
                setExpanded(!expanded);
        };

        return (
                <Card sx={{ maxWidth: 345, color:'text.secondary'}}>
                        <CardHeader
                                avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
                                        </Avatar>
                                }
                                action={
                                        <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                        </IconButton>
                                }
                                title={name}
                                subheader={
                                        address
                                }
                        />
                        <CardMedia
                                component="img"
                                height="194"
                                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6cXZHOGuTHCJ7zH0W5vS-zeNvrUNCUnXH9w&usqp=CAU"
                                alt=""
                        />
                        <CardContent>
                                <Typography variant="body2" color="text.secondary">

                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut ea rem doloribus repellendus quasi, minus enim culpa dolores quos perferendis voluptas debitis dolore est vero nulla nemo aperiam dicta corporis?
      
                                </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                        <ShareIcon />
                                </IconButton>
                                <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                >
                                        <ExpandMoreIcon />
                                </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                        
                                        <Typography paragraph>Tipos de eventos que tiene este local, para probar el filtro</Typography>
                                        <Typography paragraph>
                                                {events.map((event) => (
                                                        <TextField
                                                                sx={{ bgcolor: '#000' }}
                                                                key={event._id}
                                                                value={eventValues[event._id]}
                                                                onChange={(e) => handleChange(event._id, e.target.value)}
                                                                placeholder="Enter type of dancing"
                                                                // Otros props pueden ser pasados aquí
                                                                {...event}
                                                        />
                                                ))}
                                        </Typography>

                                        <Typography paragraph>
                                                {events.map((event) => (
                                                        <TextField
                                                                sx={{ bgcolor: '#000' }}
                                                                key={event._id}
                                                                value={eventValues[event._id]}
                                                                onChange={(e) => handleChange(event._id, e.target.value)}
                                                                placeholder="Enter type of dancing"
                                                                // Otros props pueden ser pasados aquí
                                                                {...event}
                                                        />
                                                ))}
                                        </Typography>  

                                        <Typography paragraph>Descripción:</Typography>

                                        <Typography paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati magni praesentium, quaerat architecto at ipsum. Magni tenetur ipsa commodi fuga non necessitatibus culpa ipsam cupiditate odio? Neque, quae dignissimos.r
       
                                        </Typography>
                                     
                                </CardContent>
                        </Collapse>
                </Card>
        );
}
