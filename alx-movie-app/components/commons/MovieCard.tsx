import React from 'react';
import Image from 'next/image';

interface MovieCardProps {
  title: string;
  year?: number;
  poster?: string;
  rating?: number;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  year,
  poster,
  rating,
  onClick
}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative h-64 w-full">
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate">{title}</h3>
        <div className="flex justify-between items-center text-sm text-gray-600">
          {year && <span>{year}</span>}
          {rating && <span>⭐ {rating}/10</span>}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;