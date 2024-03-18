import type { CommandRequestDTO } from "@/interfaces/command";
import request from "@/server/request";

export function executeCommand(data: CommandRequestDTO) {
  return request({
    url: '/command',
    method: "post",
    data: data
  });
}
