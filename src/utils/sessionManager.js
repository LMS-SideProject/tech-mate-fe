// Session management for guest users
export class SessionManager {
  static SESSION_KEY = 'techmate_guest_session';
  
  // Generate a unique guest session ID
  static generateGuestId() {
    return 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  // Get or create guest session
  static getSession() {
    let session = localStorage.getItem(this.SESSION_KEY);
    
    if (!session) {
      const newSession = {
        id: this.generateGuestId(),
        createdAt: new Date().toISOString(),
        userData: {},
        isLoggedIn: false
      };
      this.saveSession(newSession);
      return newSession;
    }
    
    return JSON.parse(session);
  }
  
  // Save session data
  static saveSession(sessionData) {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
  }
  
  // Update user data in session
  static updateUserData(userData) {
    const session = this.getSession();
    session.userData = { ...session.userData, ...userData };
    session.updatedAt = new Date().toISOString();
    this.saveSession(session);
    return session;
  }
  
  // Check if user is logged in
  static isLoggedIn() {
    const session = this.getSession();
    return session.isLoggedIn;
  }
  
  // Set user as logged in
  static setLoggedIn(userInfo = {}) {
    const session = this.getSession();
    session.isLoggedIn = true;
    session.userInfo = userInfo;
    session.loginAt = new Date().toISOString();
    this.saveSession(session);
    return session;
  }
  
  // Clear session (logout)
  static clearSession() {
    localStorage.removeItem(this.SESSION_KEY);
  }
  
  // Get user data
  static getUserData() {
    const session = this.getSession();
    return session.userData || {};
  }
}