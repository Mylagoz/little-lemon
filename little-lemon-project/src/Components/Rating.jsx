
import  Carousel from 'react-bootstrap/Carousel';
import '../Styles/Rating.css';
import Button from './Button.jsx';


function Rating ({className , reviews}) {


  

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
        <Button className="button-ct" path="/rate-us">Rate Us</Button>
        <div className={`${className}-carousel`}>
          <Carousel  interval={5000}>
            {reviewsChunks.map((chunk, index) => (
                <Carousel.Item key={index} >
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