import { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IPost {
  postText: ReactNode;
  _id: string;
  title: string;
  images: string[];
  user: IUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



export interface IUser {
  avatar: string;
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}


export interface IReceivedClaimRequest {
  claimRequests: {
      map(arg0: (claimRequest: { claimant: any; answer: any; description: any; _id: any; }) => import("react").JSX.Element): import("react").ReactNode;

    claimant: any, answer: string[], description: string, _id: string

  },
  title: string,
  dateFound: string,
  description: string,
  location: string,
  city: string,
  _id: string,
  images: string[],
}