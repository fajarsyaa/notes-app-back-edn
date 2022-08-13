const {nanoid} = require('nanoid');
const notes = require('./notes');

// create
const addNoteHandler = (request,h) => {
    // mendapatkan body request di hapi = server.payload - json
    const { title,tags,body} = request.payload;

    const id = nanoid(16);
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const newNote = {
        id,title,tags,body,createAt,updateAt
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note)=> note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status : "success",
            message : "berhasil tambah data",
            data : {
                noteId : id
            }
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status : "failed",
        message : "gagal tambah data",
        data : {
            noteId : id
        }
    });
    response.code(500);
    return response;
    
};

// read
const getAllNotesHandler = () => ({
    status : "success",
    data : {
        notes,
    },
});


// update
const editNoteByIdHandler = (request,h) =>{
    // mendapatkan parameter dari route parameter
    const {id} = request.params;

    // mendapatkan body request di hapi = server.payload - json
    const { title,tags,body} = request.payload;    

    const updateAt = new Date().toISOString();

    // mencari index sesuai dng id yg dimau
    const index = notes.findIndex((note)=>note.id === id);

    if (index == 1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt
        }

        const response = h.response({
            status : 'success',
            message : 'Catatan Berhasil diubah',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status : 'failed',
        message : 'Catatan gagal diubah',
    });
    response.code(404);
    return response;

}


// delete
const deleteNoteByIdHandler = (request,h) => {
    const {id} = request.params;

    const index = notes.findIndex((note)=> note.id === id );

    if (index !== -1) {
        notes.splice(index,1);
        const response = h.response({
            status : 'success',
            message : 'berhasil hapus catatan'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
            status : 'failed',
            message : 'gagal hapus catatan'
        });
        response.code(404);
        return response;
}

module.exports = {addNoteHandler,getAllNotesHandler,editNoteByIdHandler,deleteNoteByIdHandler};