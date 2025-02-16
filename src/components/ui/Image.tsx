interface ImageProps {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  return (
    <img
      className="h-96 w-full object-cover object-center"
      src={src}
      alt={alt}
      {...props}
    />
  );
};

export default Image;
