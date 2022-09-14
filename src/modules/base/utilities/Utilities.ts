import morgan from "morgan";
import bcrypt from 'bcryptjs';
import { 
  ErrorType, 
  MessageType, 
} from "../../shared/types/type";
import { ENV } from "../../shared/enums/Enum";
import helmet, { HelmetOptions } from "helmet";

const { Development } = ENV;

class Utilities {
  static Print = console.log;

  static daysToMilisConverter = (days: number): number => 1000 * 60 * 60 * 24 * days;

  static minsToHoursConverter = (mins: number): number => mins / 60;

  static mbsToBytesConverter = (mbs: number): number => mbs * 1024 * 1024;

  static getNodeEnv = (): string => process.env.NODE_ENV || Development;

  static isDevelopment = (): boolean => this.getNodeEnv() === Development;

  static generateHash = async (data: string): Promise<string> => await bcrypt.hash(data, 12);

  static compareHash = async (data: string, hash: string): Promise<boolean> => await bcrypt.compare(data, hash);
  
  static isObjectEmpty = (obj: Object): boolean => !obj || Object.keys(obj).length === 0;

  static checkObjectKeys = async (obj: Object, arr: string[]): Promise<boolean> => {
    for(const key of arr) {
      if(!(key in obj)) {
        return false;
      }
    }
    return true;
  }

  static SecurityLayer = (options?: HelmetOptions) => options ? helmet(options) : helmet();

  static Logger = (format: string = "dev") => morgan(format);

  static isValidEmail = (email: string): boolean => {
    email = email.toLowerCase().trim();
    const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email) return false;
    
    if(email.length > 254) return false;
    
    if(!(tester.test(email))) return false;
    
    const parts = email.split("@");
    if(parts[0].length > 64) return false;

    const domainParts = parts[1].split(".");
    if(domainParts.some((part) => part.length > 63 )) return false;

    return true;
  };

  static Message = (message: string, key?: string, value?: string | number): MessageType => ({
    message: message,
    [`${key}`]: value,
  });

  static ErrorMessage = (error: string): ErrorType => ({
    error: error,
  });
}

export default Utilities;
