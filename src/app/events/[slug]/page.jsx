import { Suspense } from 'react';
import EventDetails from '@/components/EventDetails';

const EventDetailsPage = async ({ params }) => {
  // Extract slug from params
  const res = await params;
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails slug={res.slug} />
      </Suspense>
    </main>
  );
};

export default EventDetailsPage;
