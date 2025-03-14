import { NextResponse } from 'next/server';
import { watchInvitations } from '@/lib/mongodb';

export async function GET() {
  // Create a transform stream to handle SSE
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  // Listen for new invitations in MongoDB
  watchInvitations((invitation) => {
    const encoder = new TextEncoder();
    writer.write(encoder.encode(`data: ${JSON.stringify({ type: 'invitation', data: invitation })}\n\n`));
  });

  // Send a heartbeat to keep the connection alive
  const sendHeartbeat = async () => {
    const encoder = new TextEncoder();
    await writer.write(encoder.encode(`data: ${JSON.stringify({ type: 'heartbeat' })}\n\n`));
  };

  // Send an initial heartbeat
  sendHeartbeat();

  // Return the response with the stream
  return new NextResponse(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}