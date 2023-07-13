pub contract BusinessRegistry {
    pub struct Business {
        pub var name: String
        pub var businessType: String

        init(name: String, businessType: String) {
            self.name = name
            self.businessType = businessType
        }
    }

    pub var publicPath: PublicPath
    pub var privatePath: StoragePath

    pub resource interface Public {
        pub fun getBusinesses(): [Business]
        pub fun asReadOnly(): BusinessRegistry.ReadOnly
    }

    pub resource interface Owner {
        pub fun getBusinesses(): [Business]

        pub fun setBusinesses(_ businesses: [Business])

        pub fun createBusiness(name: String, businessType: String)

        pub fun editBusiness(index: Int, name: String, businessType: String)
    }

    pub resource Base: Owner, Public {
        access(self) var businesses: [Business]

        init() {
            self.businesses = []
        }

        pub fun getBusinesses(): [Business] {
            return self.businesses
        }

        pub fun setBusinesses(_ businesses: [Business]) {
            self.businesses = businesses
        }

        pub fun asReadOnly(): BusinessRegistry.ReadOnly {
            return BusinessRegistry.ReadOnly(
                address: self.owner?.address,
                businesses: self.getBusinesses()
            )
        }

        pub fun createBusiness(name: String, businessType: String) {
            let business = Business(name: name, businessType: businessType)
            self.businesses.append(business)
        }

        pub fun editBusiness(index: Int, name: String, businessType: String) {
            if index >= 0 && index < self.businesses.length {
                let editedBusiness = Business(name: name, businessType: businessType)
                self.businesses[index] = editedBusiness
            } else {
                panic("Invalid index provided")
            }
        }
    }

    pub struct ReadOnly {
        pub let address: Address?
        pub let businesses: [Business]

        init(address: Address?, businesses: [Business]) {
            self.address = address
            self.businesses = businesses
        }
    }

    pub fun new(): @BusinessRegistry.Base {
        return <- create Base()
    }

    pub fun check(_ address: Address): Bool {
        return getAccount(address)
            .getCapability<&{BusinessRegistry.Public}>(BusinessRegistry.publicPath)
            .check()
    }

    pub fun fetch(_ address: Address): &{BusinessRegistry.Public} {
        return getAccount(address)
            .getCapability<&{BusinessRegistry.Public}>(BusinessRegistry.publicPath)
            .borrow()!
    }

    pub fun read(_ address: Address): BusinessRegistry.ReadOnly? {
        if let profile: &AnyResource{BusinessRegistry.Public} = getAccount(address)
            .getCapability<&{BusinessRegistry.Public}>(BusinessRegistry.publicPath)
            .borrow() {
            return profile.asReadOnly()
        } else {
            return nil
        }
    }

    init() {
        self.publicPath = /public/businessregistry
        self.privatePath = /storage/businessregistry

        self.account.save(<-self.new(), to: self.privatePath)
        self.account.link<&Base{Public}>(self.publicPath, target: self.privatePath)
    }
}
