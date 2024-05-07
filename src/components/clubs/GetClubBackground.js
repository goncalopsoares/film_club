import backgroundImage1 from '../../img/club-card-background-1.jpg';
import backgroundImage2 from '../../img/club-card-background-2.jpg';
import backgroundImage3 from '../../img/club-card-background-3.jpg';
import backgroundImage4 from '../../img/club-card-background-4.jpg';
import backgroundImage5 from '../../img/club-card-background-5.jpg';
import backgroundImage6 from '../../img/club-card-background-6.jpg';
import backgroundImage7 from '../../img/club-card-background-7.jpg';

const backgrounds = [backgroundImage1, backgroundImage2, backgroundImage3, backgroundImage4, backgroundImage5, backgroundImage6, backgroundImage7];

export const GetClubBackground = (club) => {
    return backgrounds[club.clubBackground];
};
