export type ProjectVisibility = "Active" | "Inactive";
export type ProjectLifecycleStatus = "Active" | "Completed";

export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  tag: string;
  client: string;
  sector: string;
  status: ProjectVisibility;
  lifecycleStatus: ProjectLifecycleStatus;
  completionPct: number;
  order: number;
}

export interface ProjectInput {
  title: string;
  image: string;
  description: string;
  tag: string;
  client: string;
  sector: string;
  status: ProjectVisibility;
  lifecycleStatus: ProjectLifecycleStatus;
  completionPct: number;
  order: number;
}
