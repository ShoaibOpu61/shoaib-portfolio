"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

interface ImageWithSkeletonProps extends ImageProps {
    containerClassName?: string;
}

export default function ImageWithSkeleton({
    src,
    alt,
    className,
    containerClassName,
    fill,
    width,
    height,
    ...props
}: ImageWithSkeletonProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={cn("relative overflow-hidden", containerClassName, fill ? "w-full h-full" : "")}>
            {isLoading && (
                <Skeleton className="absolute inset-0 w-full h-full z-10" />
            )}
            <Image
                src={src}
                alt={alt}
                fill={fill}
                width={width}
                height={height}
                className={cn(
                    className,
                    "transition-opacity duration-500",
                    isLoading ? "opacity-0" : "opacity-100" // Fade in when loaded
                )}
                onLoad={() => setIsLoading(false)}
                {...props}
            />
        </div>
    );
}
