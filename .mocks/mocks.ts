const defs = {
  ApiResponse: (...typeArgs) => {
    return {
      code: 95.010974256871,
      message: '我是字串',
      type: '我是字串',
    };
  },
  Category: (...typeArgs) => {
    return {
      id: 94.35031229112786,
      name: '我是字串',
    };
  },
  Order: (...typeArgs) => {
    return {
      complete: true,
      id: 70.73433062314356,
      petId: 52.11384007496436,
      quantity: 44.093671469456154,
      shipDate: '我是字串',
      status: null,
    };
  },
  Pet: (...typeArgs) => {
    return {
      category: defs.Category(),
      id: 28.954181056083872,
      name: '我是字串',
      photoUrls: ['我是字串', '我是字串', '我是字串'],
      status: null,
      tags: [defs.Tag(), defs.Tag(), defs.Tag()],
    };
  },
  Tag: (...typeArgs) => {
    return {
      id: 97.5833864501404,
      name: '我是字串',
    };
  },
  User: (...typeArgs) => {
    return {
      email: '我是字串',
      firstName: '我是字串',
      id: 7.729406656020199,
      lastName: '我是字串',
      password: '我是字串',
      phone: '我是字串',
      userStatus: 79.64853206644274,
      username: '我是字串',
    };
  },
};

const escapeDeadCycle = (fn, num = 30) => {
  let n = 0;

  return (...args) => {
    if (n > num) return {};
    n++;

    const res = fn(...args);

    return res;
  };
};

Object.keys(defs).forEach(key => {
  defs[key] = escapeDeadCycle(defs[key]);
});

export default {
  /** Everything about your Pets */
  pet: {
    /** Add a new pet to the store */
    addPet: {
      code: 0,
      data: null,
      message: '',
    },
    /** Update an existing pet */
    updatePet: {
      code: 0,
      data: null,
      message: '',
    },
    /** Finds Pets by status
Multiple status values can be provided with comma separated strings */
    findPetsByStatus: {
      code: 0,
      data: [defs.Pet(), defs.Pet(), defs.Pet()],
      message: '',
    },
    /** Finds Pets by tags
Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. */
    findPetsByTags: {
      code: 0,
      data: [defs.Pet(), defs.Pet(), defs.Pet()],
      message: '',
    },
    /** Find pet by ID
Returns a single pet */
    getPetById: {
      code: 0,
      data: defs.Pet(),
      message: '',
    },
    /** Updates a pet in the store with form data */
    updatePetWithForm: {
      code: 0,
      data: null,
      message: '',
    },
    /** Deletes a pet */
    deletePet: {
      code: 0,
      data: null,
      message: '',
    },
    /** uploads an image */
    uploadFile: {
      code: 0,
      data: defs.ApiResponse(),
      message: '',
    },
  },

  /** Access to Petstore orders */
  store: {
    /** Returns pet inventories by status
Returns a map of status codes to quantities */
    getInventory: {
      code: 0,
      data: null,
      message: '',
    },
    /** Place an order for a pet */
    placeOrder: {
      code: 0,
      data: defs.Order(),
      message: '',
    },
    /** Find purchase order by ID
For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions */
    getOrderById: {
      code: 0,
      data: defs.Order(),
      message: '',
    },
    /** Delete purchase order by ID
For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors */
    deleteOrder: {
      code: 0,
      data: null,
      message: '',
    },
  },

  /** Operations about user */
  user: {
    /** Create user
This can only be done by the logged in user. */
    createUser: {
      code: 0,
      data: null,
      message: '',
    },
    /** Creates list of users with given input array */
    createUsersWithArrayInput: {
      code: 0,
      data: null,
      message: '',
    },
    /** Creates list of users with given input array */
    createUsersWithListInput: {
      code: 0,
      data: null,
      message: '',
    },
    /** Logs user into the system */
    loginUser: {
      code: 0,
      data: '我是字串',
      message: '',
    },
    /** Logs out current logged in user session */
    logoutUser: {
      code: 0,
      data: null,
      message: '',
    },
    /** Get user by user name */
    getUserByName: {
      code: 0,
      data: defs.User(),
      message: '',
    },
    /** Updated user
This can only be done by the logged in user. */
    updateUser: {
      code: 0,
      data: null,
      message: '',
    },
    /** Delete user
This can only be done by the logged in user. */
    deleteUser: {
      code: 0,
      data: null,
      message: '',
    },
  },
};
