FROM node:latest
                                                                                
WORKDIR /usr/src/app                                                            
                                                                                
COPY package*.json ./                                                           
                                                                                
RUN npm install                                                                 
#--only=development                                                             
# RUN npm ci --only=production                                                  
                                                                                
COPY . .                                                                        
                                                                                
ARG NODE_ENV=production                                                         
ENV NODE_ENV=${NODE_ENV}                                                        
                                                                                
EXPOSE 80                                                                       
EXPOSE 3306
EXPOSE 6379

                                                                                
CMD [ "node", "sdb.js" ]                                                        
                                                                                
ARG ENV                                                                         

