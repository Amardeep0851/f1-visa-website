"use client";

import { MessageCircle } from "lucide-react";

import VideoCard from "./VideoCard";
import RedButton from "@/components/Red-Buttons";
import { handleWhatsappClick } from "@/function/handleWhatsapp";
import { Testimonial } from "@/lib/types";
import VideoCardSkeleton from "./VideoCardSkeleton";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

export const TestimonialGridSection = ({
  testimonialsData,
  error,
  loading,
}: {
  testimonialsData: Testimonial[];
  error: string | null;
  loading: boolean;
}) => {
  return (
    <>
      
      {/* Error */}
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <h3 className="text-xl font-semibold text-red-700">
            Unable to load student stories
          </h3>

          <p className="mt-2 text-zinc-600">
            Please refresh the page and try again.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 bg-red-700 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      ) : loading ? (
        // Skeleton Slider
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <VideoCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        // Netflix Slider
        <Swiper
          className="testimonial-slider"
          modules={[Navigation, Autoplay, FreeMode]}
          navigation
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          
          loop={true}
         
          grabCursor={true}
          simulateTouch={true}
          touchRatio={1.5}
          touchAngle={45}
          threshold={5}
          longSwipes={true}
          longSwipesRatio={0.2}
          longSwipesMs={200}
         
          freeMode={{
            enabled: false,
            momentum: true,
            momentumRatio: 0.8,
          }}
          
          speed={300}
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },

            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {testimonialsData.map((t, index) => (
            <SwiperSlide key={t.id}>
              <VideoCard data={t} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* CTA */}
      <div className="flex justify-center mt-15 gap-x-4">
        <RedButton
          onClick={handleWhatsappClick}
          text="APPLY IN JUST RS 36000"
          className="text-xl py-4"
          icon={<MessageCircle className="size-4" />}
        />
      </div>
    </>
  );
};
