import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchfilieres = createAsyncThunk('filieres/fetchfilieres', async () => {
  const response = await axios.get('http://localhost:3001/filieres');
  return response.data;
});

// Add new filiere
export const addFiliere = createAsyncThunk('filieres/addFiliere', async (filiereData) => {
  const response = await axios.post('http://localhost:3001/filieres', filiereData);
  return response.data;
});

// Edit a filiere
export const editFiliere = createAsyncThunk('filieres/updateFiliere', async (filiere) => {
  const response = await axios.put(`http://localhost:3001/filieres/${filiere.id}`, filiere);

  return response.data;
});

// Delete a filiere
export const deleteFiliere = createAsyncThunk('filieres/deleteFiliere', async (id) => {
  await axios.delete(`http://localhost:3001/filieres/${id}`);
  return id;
});

export const fetchFiliereById = createAsyncThunk('filieres/fetchFiliereById', async (id) => {
  const response = await axios.get(`http://localhost:3001/filieres/${id}`);
  return response.data;
});

const FilieresSlice = createSlice({
  name: 'filieres',
  initialState: {
    filieres: [],
    selectedFiliere: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch filieres
      .addCase(fetchfilieres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchfilieres.fulfilled, (state, action) => {
        state.loading = false;
        state.filieres = action.payload;
      })
      .addCase(fetchfilieres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add new filiere
      .addCase(addFiliere.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFiliere.fulfilled, (state, action) => {
        state.loading = false;
        // Add the newly created filiere to the state
        state.filieres.push(action.payload);
      })
      .addCase(addFiliere.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Edit a filiere
      .addCase(editFiliere.pending, (state) => {
        state.loading = true;
      })
      .addCase(editFiliere.fulfilled, (state, action) => {
        const index = state.filieres.findIndex((f) => f.id === action.payload.id);
        if (index !== -1) {
          console.log(index);
          state.filieres[index] = action.payload;
        }
      })
      .addCase(editFiliere.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete a filiere
      .addCase(deleteFiliere.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFiliere.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted filiere from the state using the ID
        state.filieres = state.filieres.filter((filiere) => filiere.id !== action.payload);
      })
      .addCase(deleteFiliere.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFiliereById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiliereById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFiliere = action.payload;
      })
      .addCase(fetchFiliereById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default FilieresSlice.reducer;
