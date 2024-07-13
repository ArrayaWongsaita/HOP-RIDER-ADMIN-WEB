// src/constants/index.js

export const mockRiders = {
  1: {
    profileImg:
      "https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.6435-9/54236682_1261847423980149_3478770548794720256_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeF4aQdj7IKTUr3z8dPOKY5JsXmnsJrSsNexeaewmtKw15aqE3_kFYe8cSND8p35musTYKoBRvfK32Qi0utzSIE3&_nc_ohc=PS1iaW-TdpwQ7kNvgFBEaYj&_nc_ht=scontent.fbkk2-8.fna&oh=00_AYDSR4FbSov3jt61W2aIqDTFMPEwz1LbhQZ8LzIK5UDnwA&oe=66ADC136",
    firstName: "John",
    lastName: "Wick",
  },
  2: {
    profileImg:
      "https://scontent.fbkk2-8.fna.fbcdn.net/v/t39.30808-6/337820493_1146862922584229_6920475203936666124_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE2dJ4wAlIx7EcDjrjgOfL2zbGwhdw9xJvNsbCF3D3Em5Bl0_xvVehY4cIWQ3VNRqQ4f9ZDoqB1-9uRjctYt2VP&_nc_ohc=mEZ0Fgu3LEQQ7kNvgE_YQmk&_nc_ht=scontent.fbkk2-8.fna&oh=00_AYCvLUI9sQj5_edVMXE6Ze9EsMtGZaDRoGWWcUarmUc0gQ&oe=668C29AC",
    firstName: "Donny",
    lastName: "Yen",
  },
};

export const mockCustomers = {
  1: {
    profileImg:
      "https://hips.hearstapps.com/hmg-prod/images/spongebob-squarepants-1592120738.jpg?crop=0.482xw:1.00xh;0.169xw,0&resize=980:*",
    firstName: "SpongeBob",
    lastName: "SquarePants",
  },
  2: {
    profileImg:
      "https://scontent.fbkk2-7.fna.fbcdn.net/v/t39.30808-6/449107662_867700875386252_4941070785228174118_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGO3D9DAZBxr09rcMJeiyMvVh_nuwvXtepWH-e7C9e16lStHp-axV2rfA0mII0GeQzn2tJB9U0ARVU4FDPHNeNu&_nc_ohc=rBAsXIvC65EQ7kNvgH4cYbV&_nc_ht=scontent.fbkk2-7.fna&gid=AoGrd5bfFooLdQNvkoV18Us&oh=00_AYA62xRbbi-ChHlKWv_7-ERefmubagT_Ic_OK_iTuEqC4Q&oe=668C28FA",
    firstName: "Minion",
    lastName: "banana",
  },
};

export const orderDataMock = {
  1: {
    riderId: 1,
    customerId: 1,
    status: "PENDING",
    pickupPlace: "เซ็นทรัลลาดพร้าว",
    desPlace: "มาบุญครอง",
  },
  2: {
    riderId: 2,
    customerId: 2,
    status: "ACCEPTED",
    pickupPlace: "สนามหลวง",
    desPlace: "สยามพารากอน",
  },
};

export const statusOptions = [
  "PENDING",
  "ACCEPTED",
  "PICKINGUP",
  "ARRIVED",
  "PICKEDUP",
  "DELIVERING",
  "FINISHED",
  "CANCELED",
];
