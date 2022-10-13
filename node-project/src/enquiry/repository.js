
exports.create = (db, data)=> {
    var enquiryRef = db.ref("enquiries");
    var enquiry = enquiryRef.child(data.uuid);
    return enquiry.update(data);
}