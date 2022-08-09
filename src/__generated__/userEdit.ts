/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { userEditInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: userEdit
// ====================================================

export interface userEdit_userEdit {
  __typename: "userEditOutput";
  ok: boolean;
  error: string | null;
}

export interface userEdit {
  userEdit: userEdit_userEdit;
}

export interface userEditVariables {
  input: userEditInput;
}
