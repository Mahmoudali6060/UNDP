using Account.Entities;
using Accouting.Shared.Entities;
using AutoMapper;
using Data.Entities;
using Data.Entities.Shared;
using Data.Entities.UserManagement;
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

            CreateMap<Category, CategoryDTO>();
            CreateMap<CategoryDTO, Category>();
            CreateMap<Company, CompanyDTO>();
            CreateMap<CompanyDTO, Company>();

            CreateMap<AccountTree, AccountTree>();
            CreateMap<AccountTree, AccountTree>();


            #region Users
            CreateMap<UserProfile, UserProfileDTO>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.AppUser.UserName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.AppUser.Email));

            CreateMap<UserProfileDTO, UserProfile>();

            #endregion

        }
    }
}
