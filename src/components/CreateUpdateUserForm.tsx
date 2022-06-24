import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { Box, Container } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { UserRoleEnum } from '../models/UserRoleEnum';
import { UserStatusEnum } from '../models/userStatusEnum';
import { useCreateUserMutation, useGetUserQuery, useUpdateUserMutation } from '../redux/Api/api';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

type Props = {
  action: string
  data?: string
}

const CreateUpdateUserForm: any = ({ action, data }: Props) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRoleEnum>(UserRoleEnum.MEMBER);
  const [status, setStatus] = useState<UserStatusEnum>(UserStatusEnum.INACTIVE);
  const [createUser, { isError: isUserCreationError, isSuccess, isLoading }] = useCreateUserMutation();
  const [updateUser, { isError: isUpdateUserError, isSuccess: isUpdateUserSuccess, isLoading: isUpdateUserLoading }] = useUpdateUserMutation();

  console.log("selected row data _id: ", data)
  const {
    isAuthorized
  } = useAuth();

  const {
    data: userData,
    isLoading: isLoadingLoggedUser,
    error,
    isError,
    isSuccess: getUserSuccess
  } = useGetUserQuery(data ?? "", {
    skip: !data,
  });

  useEffect(() => {
    if (userData) {
      setName(userData.user.name)
      setEmail(userData.user.email)
      setRole(userData.user.role)
      setStatus(userData.user.status)
    }

  }, [])

  const handleRoleChange = (e: any) => {
    setRole(e.target.value)
  }
  const handleStatusChange = (e: any) => {
    setStatus(e.target.value)
  }
  const handleNameChange = (e: any) => {
    setName(e.target.value)
  }
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    {
      action === 'create' && await createUser({
        name: name,
        email: email,
        password: password,
        role: role,
        status: status,
      })
    }

    {
      action === 'update' && getUserSuccess
        && await updateUser({
          _id: userData.user._id,
          name: name,
          email: email,
          password: password,
          role: role,
          status: status
        })
    }
    setName("")
    setEmail("")
    setPassword("")
    setRole(UserRoleEnum.MEMBER)
    setStatus(UserStatusEnum.INACTIVE)
    setOpen(false)
  }

  return (
    <div>
      {isAuthorized([UserRoleEnum.SUPER_ADMIN,UserRoleEnum.ADMIN]) && <div>
        {action === 'update' && (
          <Tooltip title="Update">
            <IconButton onClick={handleClickOpen}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}

        {action === 'create' && (
          <Tooltip title={`Add `}>
            <IconButton onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Management</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {action.charAt(0).toUpperCase() + action.slice(1)} user
          </DialogContentText>
        </DialogContent>
        <Container>
          <Box component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} autoComplete="on" onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              name="name"
              label="Name"
              autoFocus
              value={name}
              onChange={handleNameChange}
              required
            />
            <TextField variant="standard"
              name="email"
              label="Email"
              type="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              required
            />
            <TextField variant="standard"
              name="password"
              label="Password"
              type="password"
              autoFocus
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="role">Role</InputLabel>
              <Select
                name="role"
                labelId="role"
                autoFocus
                onChange={handleRoleChange}
                value={role}
                label="Role"
                required
              >
                {Object.values(UserRoleEnum).map(userRole => <MenuItem key={userRole} value={userRole}>{userRole}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="status">Status</InputLabel>
              <Select
                name="status"
                labelId="status"
                autoFocus
                value={status}
                onChange={handleStatusChange}
                label="Status"
                required
              >
                {Object.values(UserStatusEnum).map(userStatus => <MenuItem key={userStatus} value={userStatus}>{userStatus}</MenuItem>)}
              </Select>
            </FormControl>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{action}</Button>
            </DialogActions>
          </Box>
        </Container>
      </Dialog>
    </div>
  );
}

export default CreateUpdateUserForm
