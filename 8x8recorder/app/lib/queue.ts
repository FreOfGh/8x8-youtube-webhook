import { Queue } from "bullmq"
import { connection } from "./redis"

export const recordingQueue = new Queue("recordings", {
  connection
})
