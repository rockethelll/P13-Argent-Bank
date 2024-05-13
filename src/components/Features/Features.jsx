import FeatureCard from '@/components/FeatureCard/FeatureCard';
import data from '@/data/data.json';

const Features = () => {
  return (
    <section className='features'>
      <h2 className='sr-only'>Features</h2>
      {data.map((feature, index) => (
        <FeatureCard
          key={index}
          img={feature.img}
          alt={feature.alt}
          title={feature.title}
          content={feature.content}
        />
      ))}
    </section>
  );
};

export default Features;
