
import  Carousel from 'react-bootstrap/Carousel';
import '../Styles/Rating.css';
import Button from './Button.jsx';

function Rating ({className}) {
const reviews=[
    { 
        name: 'John Doe',
        review: 'The food was amazing! I loved the Greek salad and the lemon dessert.',
        image: 'https://unavatar.io/JohnDoe'
    },
    {
     
        name: 'Jane Smith',
        review: 'Great atmosphere and friendly staff. Will definitely come back!',
        image: 'https://unavatar.io/JaneSmith'
    },
    {
  
        name: 'Alice Johnson',
        review: 'A delightful dining experience. The specials were top-notch!',
        image: 'https://unavatar.io/AliceJohnson'
    },
    {
        
        name: 'Bob Brown',
        review: 'Loved the ambiance and the food. The cocktails were a nice touch!',
        image: 'https://unavatar.io/Bobrown'
    },
    {

        name: 'Charlie White',
        review: 'A hidden gem! The Mediterranean flavors were spot on.',
        image: 'https://unavatar.io/CharlieWhite'
    },
    {
        name: 'Diana Green',
        review: 'Exceptional service and delicious food. Highly recommend the pasta dishes!',
        image: 'https://unavatar.io/DianaGreen'
    },
 
    ];

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const reviewsChunks = chunkArray(reviews, 3);

  return (
    <section className={className} >
        <Button className="button-ct" path="mailto:info@littlelemon.com">Rate Us</Button>
        <div className={`${className}-carousel`}>
          <Carousel  interval={5000}>
            {reviewsChunks.map((chunk, index) => (
                <Carousel.Item key={index}>
                   <div className="ratings-cards">
                    {chunk.map((review) => (
                        <div className="rating-card" key={review.name}>
                            <img src={review.image} alt={review.name} />
                            <div className="rc-description">
                                <h5>{review.name}</h5>
                                <p>{review.review}</p>
                            </div>
                        </div>
                    ))}
                   </div>
                </Carousel.Item>
            ))}
           </Carousel>
        </div>   
    </section>

  )


}

export default Rating;