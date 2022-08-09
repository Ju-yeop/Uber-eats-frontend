/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface VerifyEmailInput {
  code: string;
}

export interface restaurantsInput {
  page?: number | null;
}

export interface userEditInput {
  email?: string | null;
  password?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
