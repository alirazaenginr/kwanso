import Utilities from "../utilities/Utilities";

export default require('knex')(require('../../../knexfile')[Utilities.getNodeEnv()]);
