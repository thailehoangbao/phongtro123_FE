import icons from "../icons";
const { FaStar } = icons;

export const StarComponent = ({ x }) => {
    // Chuyển `x` thành số và lặp qua số lần tương ứng để render các ngôi sao
    const stars = Array.from({ length: Number(x) }, (_, index) => (
    <FaStar key={index} className="star-item pb-1" size={18} color="yellow" />
    ));

    return stars;
};