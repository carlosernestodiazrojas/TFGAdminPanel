interface ImageGalleryProps {
    images: string[];

    altText?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, altText = 'Imagen' }) => {
    return (
        <section className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((src, idx) => (
                    <div
                        key={idx}
                        className="overflow-hidden rounded-xl shadow-lg bg-white"
                    >
                        <img
                            src={src}
                            alt={`${altText} ${idx + 1}`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 hover:scale-102"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ImageGallery;
