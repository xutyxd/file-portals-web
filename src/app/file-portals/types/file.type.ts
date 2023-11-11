import { FilePortal } from "file-portals";

export type IFile = Awaited<ReturnType<FilePortal['files']>>[number];