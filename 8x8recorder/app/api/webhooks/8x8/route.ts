import { NextResponse } from "next/server"
import { recordingQueue } from "../../../lib/queue"
//hola
export async function POST(req: Request) {

  try {

    const body = await req.json()

    const eventType = body.eventType

    if (eventType !== "recording.completed") {
      return NextResponse.json({ ignored: true })
    }

    const { recordingId, downloadUrl, duration, size } = body

    await recordingQueue.add("process-recording", {
      recordingId,
      downloadUrl,
      duration,
      size
    })

    console.log("Recording queued:", recordingId)

    return NextResponse.json({
      queued: true
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Webhook error" },
      { status: 500 }
    )

  }
}
