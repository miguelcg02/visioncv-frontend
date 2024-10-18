import { Slider } from '@/components/ui/slider';

interface StageHeaderProps {
  step: string;
  sliderValue: number;
  description: string;
}

export const StageHeader: React.FC<StageHeaderProps> = ({ step, sliderValue, description }) => {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='font-medium'>{step}</h3>
      <Slider defaultValue={[sliderValue]} max={100} disabled withOutThumb />
      <p>{description}</p>
    </div>
  );
};
