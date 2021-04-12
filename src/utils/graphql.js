import gql from "graphql-tag";

export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      userName
      email
      id
      isActive
      phoneNumber
      createdAt
      createdBy
    }
  }
`;

export const FETCH_BRANCHES_QUERY = gql`
  {
    branches {
      id
      branchName
      phoneNumber
      numberOfEmployees
      dateOfActivation
      street
      dateCreated
      dateModified
      createdBy
      corporateCode
      creatorId
    }
  }
`;

export const FETCH_EMPLOYEE_QUERY = gql`
  {
    employees {
      employeeName
      email
      phoneNumber
      walletBalance
      branch
      riderCode
      isActive
      selfApproved
      corporate
      createdAt
    }
  }
`;

export const FETCH_CORPORATE_QUERY = gql`
  query($id: ID!) {
    getCorporate(id: $id) {
      DisplayName
    }
  }
`;

// export const FETCH_BRANCHES_QUERY = gql`
//   query($phoneNumber: String!) {
//     getRider(phoneNumber: $phoneNumber) {
//       UserName
//       Name
//       NormalizedEmail
//       Email
//       NormalizedUserName
//       PhoneNumber
//     }
//   }
// `;

export const FETCH_BRANCHES_SUB_QUERY = gql`
  {
    branches {
      id
      branchName
    }
  }
`;
