﻿using Account.Entities;
using AutoMapper;
using Data.Entities;
using Data.Entities.FleetManagement;
using Data.Entities.Shared;
using Data.Entities.UserManagement;
using FleetManagement.Entities;
using Shared.Entities.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace App
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            #region Settings
            CreateMap<Company, CompanyDTO>();
            CreateMap<CompanyDTO, Company>();

            CreateMap<AccountTree, AccountTree>();
            CreateMap<AccountTree, AccountTree>();

            #endregion

            #region Users Management
            CreateMap<UserProfile, UserProfileDTO>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.AppUser.UserName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.AppUser.Email));

            CreateMap<UserProfileDTO, UserProfile>();
            #endregion

            #region Fleet Management
            CreateMap<CarRequest, CarRequestDTO>()
                .ForMember(dest => dest.DateFrom, opt => opt.MapFrom(src => src.DateFrom.ToString("dd-MM-yyyy HH:ss tt")))
                .ForMember(dest => dest.DateTo, opt => opt.MapFrom(src => src.DateTo.ToString("dd-MM-yyyy HH:ss tt")));

            CreateMap<CarRequestDTO, CarRequest>();
               
            #endregion

        }
    }
}
