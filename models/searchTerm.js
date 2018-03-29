//Requirements for mongoose and schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Model
const searchTermSchema = ({
searchVal: String,
  searchDate : Date

},
{timestamps:true}
);