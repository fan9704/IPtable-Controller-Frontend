import request from "@/server/request";

export function getNodes() {
  return request({
    url: "/pve/nodes",
    method: "get",
  });
}
export function getNodeQEMUs(node: string) {
  return request({
    url: `/pve/nodes/${node}/qemu`,
    method: "get",
  });
}

export function getNodeStorages(node: string) {
  return request({
    url: `/pve/nodes/${node}/storages`,
    method: "get",
  });
}

export function getNodeFirewallRules(node: string) {
  return request({
    url: `/pve/nodes/${node}/firewall-rules`,
    method: "get",
  });
}
