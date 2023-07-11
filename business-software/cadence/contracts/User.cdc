pub contract User {

  pub let publicPath: PublicPath
  pub let privatePath: StoragePath

  pub resource interface Public {
    pub fun getUsername(): String
    pub fun getEmail(): String
    pub fun asReadOnly(): User.ReadOnly
  }

  pub resource interface Owner {
    pub fun getUsername(): String
    pub fun getEmail(): String
 
    pub fun setUsername(_ username : String)
    pub fun setEmai(_ email : String)
  }

  pub resource Base: Owner, Public {
    access(self) var username: String
    access(self) var email: String

    init(){
      self.username = ""
      self.email = ""
    }

    pub fun getUsername(): String { return self.username}
    pub fun getEmail(): String { return self.email}

    pub fun setUsername(_ username: String) { self.username = username}
    pub fun setEmai(_ email: String) { self.email = email}

    pub fun asReadOnly(): User.ReadOnly {
      return User.ReadOnly(
        address : self.owner?.address,
        username: self.getUsername(),
        email: self.getEmail()
      )
    }
  }

  pub struct ReadOnly {
    pub let address: Address?
    pub let username: String
    pub let email: String

    init(address:Address?, username:String, email:String){
      self.address = address
      self.username = username
      self.email = email
    }
  }

  pub fun new(): @User.Base {
    return <- create Base()
  }

  pub fun check(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&{User.Public}>(User.publicPath)
      .check()
  }

  pub fun fetch(_ address: Address): &{User.Public} {
    return getAccount(address)
      .getCapability<&{User.Public}>(User.publicPath)
      .borrow()!
  }

  pub fun read(_ address: Address): User.ReadOnly? {
    if let profile: &AnyResource{User.Public} = getAccount(address).getCapability<&{User.Public}>(User.publicPath).borrow() {
      return profile.asReadOnly()
    } else {
      return nil
    }
  }

  init() {
    self.publicPath = /public/userprofile
    self.privatePath = /storage/userprofile

    self.account.save(<- self.new(), to: self.privatePath)
    self.account.link<&Base{Public}>(self.publicPath, target: self.privatePath)

    self.account
      .borrow<&Base{Owner}>(from: self.privatePath)!
      .setUsername("qvvg")
  }

}