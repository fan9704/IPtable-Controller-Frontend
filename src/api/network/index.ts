import request from "@/server/request";
import type { NetworkRecord, NetworkRecordRequestDTO } from "@/interfaces/network";

export function listNetworkRecords() {

  return request({
    url: "/nat/records",
    method: "get",
  });
}
export function getNetworkRecord(id: string) {
  return request({
    url: `/nat/record/${id}`,
    method: "get",
  });
}

export function deleteNetworkRecord(id: string) {
  return request({
    url: `/nat/record/${id}`,
    method: "delete",
  });
}

export function patchNetworkRecord(id: string, data: NetworkRecordRequestDTO) {
  return request({
    url: `/nat/record/${id}`,
    method: "patch",
    data: data
  });
}

export function createNetworkRecord(data: NetworkRecordRequestDTO) {
  return request({
    url: "/nat/record",
    method: "post",
    data: data,
  });
}
