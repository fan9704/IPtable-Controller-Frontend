import request from "@/server/request";
import type { QemuVM, Storage, FirewallRule, Node, Pool } from "@/interfaces/proxmox";

// All API

export function getNodes(): Promise<Node[]> {
  return request({
    url: "/pve/nodes",
    method: "get",
  });
}

export function getStorages(): Promise<Storage[]> {
  return request({
    url: "/pve/storages",
    method: "get",
  });
}

export function getPools(): Promise<Pool[]> {
  return request({
    url: "/pve/pools",
    method: "get",
  });

}

// Node API

export function getNodeQEMUs(node: string): Promise<QemuVM[]> {
  return request({
    url: `/pve/nodes/${node}/qemu`,
    method: "get",
  });
}

export function getNodeStorages(node: string): Promise<Storage[]> {
  return request({
    url: `/pve/nodes/${node}/storages`,
    method: "get",
  });
}

export function getNodeFirewallRules(node: string): Promise<FirewallRule[]> {
  return request({
    url: `/pve/nodes/${node}/firewall-rules`,
    method: "get",
  });
}

// Cluster API
