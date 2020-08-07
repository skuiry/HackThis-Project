String root = Environment.getExternalStorageDirectory().toString(); //get access to directory path
            File myDir = new File(root + "/Settings");//create folder in internal storage
            myDir.mkdirs();// make directory
            File file = new File(myDir, FILENAME);//making a new file in the folder

            if(file.exists())   // check if file exist
            {
                //Read text from file
                StringBuilder text = new StringBuilder();

                try {
                    BufferedReader br = new BufferedReader(new FileReader(file));
                    String line;

                    while ((line = br.readLine()) != null) {
                        text.append(line);
                    }
                }
                catch (IOException e) {
                    //You'll need to add proper error handling here
                }
                //Set the text


            JSONObject obj = new JSONObject(text.toString());
            JSONArray arr = obj.getJSONArray("Record");
            for (int i = 0; i < arr.length(); i++){
                 String name = arr.getJSONObject(i).getString("name");
                 String date = arr.getJSONObject(i).getString("date");
                 String time = arr.getJSONObject(i).getString("time");
                 String active_hours = arr.getJSONObject(i).getString("active-hours");
                 String score = arr.getJSONObject(i).getString("score");
                 String redirect-url = arr.getJSONObject(i).getString("redirect-url");
                 String time-spend = arr.getJSONObject(i).getString("time-spend");
              }
            }
            else
            {
                rb1.setText("Sorry file doesn't exist!!");
            }