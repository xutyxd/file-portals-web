import { FilePeer, FilePortal } from "file-portals";

export type IConnection = { id: string, portal: FilePortal, peer: FilePeer, domains: string[] }