import React from 'react';
import { Player } from '../types';
import './Icon.css'; // Ensure your CSS is properly styled

interface IconProps {
    player: Player | null;
    style: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ player, style }) => {
    const getJerseyImage = (club: string) => {
        try {
            // Use dynamic import for fetching the correct jersey image
            return import(`../assets/images/kits/${club}.png`).then(image => image.default);
        } catch (error) {
            // Return a default image if the club's jersey isn't found
            return import('../assets/images/kits/Default.png').then(image => image.default);
        }
    };

    const [jerseyImage, setJerseyImage] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (player) {
            getJerseyImage(player.teamName).then(setJerseyImage);
        } else {
            import('../assets/images/kits/Default.png').then(image => setJerseyImage(image.default));
        }
    }, [player]);

    return (
        <div className="icon" style={style}>
            <div className="shirt-icon">
                {jerseyImage ? (
                    <img src={jerseyImage} alt={`${player ? player.teamName : 'Default'} jersey`} />
                ) : (
                    <span>Loading...</span>
                )}
            </div>
            <div className="name" style={{ backgroundColor: player ? '#000000' : 'grey' }}>
                {player ? player.name : 'Empty'}
            </div>
        </div>
    );
};

export default Icon;